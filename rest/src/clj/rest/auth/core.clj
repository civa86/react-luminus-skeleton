(ns rest.auth.core
  (:require [rest.response.core :as resp]))

(defn is-authenticated? [handler]
  (fn [request]
    (let [token (get-in request [:headers "authorization"])]
      (if (empty? token)
        (resp/not-authorized)
        (let []
          (clojure.pprint/pprint token)
          (handler request)
          )))

    ))
