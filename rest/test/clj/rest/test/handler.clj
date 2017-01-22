(ns rest.test.handler
  (:require [clojure.test :refer :all]
            [ring.mock.request :refer :all]
            [clojure.data.json :as json]
            [rest.handler :refer :all]))

(deftest app-routes
  (testing "main route"
    (let [response ((app) (request :get "/"))]
      (is (= 200 (:status response)))))

  (testing "every route is a main route"
    (let [response ((app) (request :get "/every-route"))]
      (is (= 200 (:status response)))))
  )

(deftest service-routes
  (testing "info api"
    (let [response ((app) (request :get "/api/info"))]
      (is (= 200 (:status response)))
      (let [resp-body (json/read-str (slurp (:body response)) :key-fn keyword)]
        (is (not (nil? (:version resp-body))))
        (is (= true (string? (:version resp-body)))))))
  )
