(ns rest.routes.services
  (:require [ring.util.http-response :refer :all]
            [compojure.api.sweet :refer :all]
            [clojure.tools.logging :as log]
            [clojure.string :as str]
            [rest.db.core :refer [*db*] :as db]
            [schema.core :as s]))

(defapi service-routes
  {:swagger {:ui "/swagger-ui"
             :spec "/swagger.json"
             :data {:info {:version (System/getProperty "rest.version")
                           :title "Sample API"
                           :description "Sample Services"}}}}

  (context "/api" []
    :tags ["thingie"]

    (GET "/" []
      :return   s/Any
      :summary  ""
      (ok {:version (System/getProperty "rest.version")}))

    ;(GET "/users" []
    ;  :return   s/Any
    ;  :summary  ""
    ;  (ok (db/get-users)))

    (GET "/*" []
      :return   s/Any
      :summary  "Not Matched Api Route"
      (not-found {:code 404 :error "Resource not found"}))

    ))
