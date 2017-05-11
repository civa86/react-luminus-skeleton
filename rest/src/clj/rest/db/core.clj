(ns rest.db.core
  (:require
    [clojure.java.jdbc :as jdbc]
    [conman.core :as conman]
    [rest.config :refer [env]]
    [mount.core :refer [defstate]])
  (:import [java.sql
            BatchUpdateException
            PreparedStatement]))

 (defstate ^:dynamic *db*
            :start (conman/connect! {:jdbc-url (env :database-url)})
            :stop (conman/disconnect! *db*))

(conman/bind-connection *db* "sql/queries.sql")

(defmacro inject-conn
  "Inject the connection if not nil, for compatibility with hugsql arity handling"
  [param fn]
  `(if (nil? ~param) ~fn ~(list (first fn) param (second fn))))

(defn to-date [^java.sql.Date sql-date]
  (-> sql-date (.getTime) (java.util.Date.)))

(extend-protocol jdbc/IResultSetReadColumn
  java.sql.Date
  (result-set-read-column [v _ _] (to-date v))

  java.sql.Timestamp
  (result-set-read-column [v _ _] (to-date v)))

(extend-type java.util.Date
  jdbc/ISQLParameter
  (set-parameter [v ^PreparedStatement stmt idx]
    (.setTimestamp stmt idx (java.sql.Timestamp. (.getTime v)))))
