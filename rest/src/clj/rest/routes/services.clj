(ns rest.routes.services
  (:require [ring.util.http-response :refer :all]
            [compojure.api.sweet :refer :all]
            [clojure.tools.logging :as log]
            [clojure.string :as str]
            [schema.core :as s]))

(defapi service-routes
  {:swagger {:ui "/swagger-ui"
             :spec "/swagger.json"
             :data {:info {:version project-version
                           :title "Sample API"
                           :description "Sample Services"}}}}

  (context "/api" []
    :tags ["thingie"]

    (GET "/" []
      :return   s/Any
      :summary  ""
      (ok {:version (System/getProperty "rest.version")}))

    (GET "/*" []
      :return   s/Any
      :summary  "Not Matched Api Route"
      (not-found {:code 404 :error "Resource not found"}))

    ))
