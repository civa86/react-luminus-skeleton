(ns user
  (:require [mount.core :as mount]
            rest.core))

(defn start []
  (mount/start-without #'rest.core/repl-server))

(defn stop []
  (mount/stop-except #'rest.core/repl-server))

(defn restart []
  (stop)
  (start))


