(ns rest.handler
  (:require [compojure.core :refer [routes wrap-routes]]
            [rest.layout :refer [error-page]]
            [rest.routes.app :refer [app-routes]]
            [rest.routes.services :refer [service-routes]]
            [rest.env :refer [defaults]]
            [mount.core :as mount]
            [rest.middleware :as middleware]))

(mount/defstate init-app
                :start ((or (:init defaults) identity))
                :stop  ((or (:stop defaults) identity)))

(def application-routes
  (routes
    #'service-routes
    (-> #'app-routes
        (wrap-routes middleware/wrap-csrf)
        (wrap-routes middleware/wrap-formats))))

(defn app [] (middleware/wrap-base #'application-routes))
