(ns rest.routes.services
  (:require [ring.util.http-response :refer :all]
            [compojure.api.sweet :refer :all]
            [clojure.tools.logging :as log]
            [clojure.string :as str]
            [schema.core :as s]))

(def project-version "1.0.0")

(defapi service-routes
  {:swagger {:ui "/swagger-ui"
             :spec "/swagger.json"
             :data {:info {:version project-version
                           :title "Sample API"
                           :description "Sample Services"}}}}

  (context "/api" []
    :tags ["thingie"]

    (GET "/info" []
      :return   s/Any
      :summary  ""
      (Thread/sleep 1000)
      (ok {:version project-version}))

    (GET "/*" []
      :return   s/Any
      :summary  "Not Matched Api Route"
      (Thread/sleep 1000)
      (not-found {:code 404 :error "Resource not found"}))

    ))
