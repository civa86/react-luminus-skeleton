(ns rest.routes.context.user
  (:require [ring.util.http-response :refer :all]
            [compojure.api.sweet :refer :all]
            [schema.core :as s]
            [clojure.tools.logging :as log]
            [rest.auth.core :as auth]))

(s/defschema USER {
                   (s/required-key :email)     (s/constrained s/Str #(not (clojure.string/blank? %))) ;TODO email regexp
                   (s/required-key :password)  (s/constrained s/Str #(not (clojure.string/blank? %)))
                   (s/optional-key :firstname)  (s/constrained s/Str #(not (clojure.string/blank? %)))
                   (s/optional-key :lastname)  (s/constrained s/Str #(not (clojure.string/blank? %)))
                   })

(def ctx-user
  (context "/user" []
    (GET "/" []
      :return s/Any
      :summary "Get User Data"
      :middleware [auth/is-authenticated?]
      (log/info "[API] /user")
      (ok {:version (System/getProperty "rest.version")}))

    (POST "/registration" []
      :return s/Any
      :summary "User Registration"
      :body [request-data s/Any]
      (log/info "[API] /user/registration")
      (s/validate USER request-data)
      (ok {:a 3}))

    (GET "/login" []
      :return s/Any
      :summary "User Login"
      :body [request-data s/Any]
      (log/info "[API] /user/login")
      (ok {:version (System/getProperty "rest.version")}))
    ))
