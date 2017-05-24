(ns rest.routes.services
  (:require [compojure.api.sweet :refer :all]
            [rest.routes.context.general :refer :all]
            [rest.routes.context.user :refer :all]
            [compojure.api.exception :as ex]
            [rest.response.core :as resp]))

(defapi service-routes
  {:swagger {:ui "/swagger-ui"
             :spec "/swagger.json"
             :data {:info {:version (System/getProperty "rest.version")
                           :title "FIXME"
                           :description "FIXME"}}
             }
   :exceptions {:handlers {
                           ::schema.core/error (resp/error-bad-request)
                           ::ex/default (resp/error-generic)
                           }}}

  (context "/api" []
    (routes
      #'ctx-user
      #'ctx-general)))
