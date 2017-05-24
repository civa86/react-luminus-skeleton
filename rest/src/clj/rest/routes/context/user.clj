(ns rest.routes.context.user
  (:require [ring.util.http-response :refer :all]
            [compojure.api.sweet :refer :all]
            [schema.core :as s]
            [rest.auth.core :as auth]))

(def ctx-user
  (context "/user" []
    :middleware [auth/is-authenticated?]

    (GET "/" []
      :return   s/Any
      :summary  ""
      ;(log/info "[API] /")
      (ok {:version (System/getProperty "rest.version")}))
    ))
