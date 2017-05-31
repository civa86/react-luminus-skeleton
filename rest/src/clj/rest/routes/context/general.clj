(ns rest.routes.context.general
  (:require [ring.util.http-response :refer :all]
            [compojure.api.sweet :refer :all]
            [clojure.tools.logging :as log]
            [schema.core :as s]))

(def ctx-general
  (context "/" []

    (GET "/" []
      :return s/Any
      :summary ""
      (log/info "[API] /")
      (ok {:version (System/getProperty "rest.version")}))

    (GET "/*" request
      :return s/Any
      :summary "Not Matched Api Route"
      (log/info "[API] " (get request :path-info) " not found")
      (not-found {:code 404 :error "Resource not found"}))
    ))
