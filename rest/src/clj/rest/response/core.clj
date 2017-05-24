(ns rest.response.core
  (:require [ring.util.http-response :refer :all]
            [clojure.tools.logging :as log]))

;TODO define a unique exception hanlder...

(defn error-generic []
  (fn [^Exception e]
    (log/error "Error: generic" e)
    (internal-server-error {:error (.getMessage e)})))

(defn not-authorized []
  (log/error "Error: not authorized")
  (forbidden {:code 403 :error "Not Authorized" :content nil}))
