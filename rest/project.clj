(defproject rest "0.1.0-SNAPSHOT"

  :description "React Luminus Skeleton, Backend"
  :url "http://example.com/FIXME"

  :dependencies [[bouncer "1.0.0"]
                 [compojure "1.5.1"]
                 [cprop "0.1.9"]
                 [luminus-immutant "0.2.2"]
                 [luminus-nrepl "0.1.4"]
                 [conman "0.5.8"]
                 [mysql/mysql-connector-java "5.1.6"]
                 [markdown-clj "0.9.91"]
                 [metosin/compojure-api "1.1.9"]
                 [metosin/ring-http-response "0.8.0"]
                 [mount "0.1.10"]
                 [org.clojure/clojure "1.8.0"]
                 [org.clojure/tools.cli "0.3.5"]
                 [org.clojure/tools.logging "0.3.1"]
                 [org.webjars/webjars-locator-jboss-vfs "0.1.0"]
                 [ring-middleware-format "0.7.0"]
                 [ring-webjars "0.1.1"]
                 [ring/ring-core "1.5.1"]
                 [ring/ring-defaults "0.2.1"]
                 [selmer "1.10.2"]]

  :min-lein-version "2.0.0"

  :jvm-opts ["-server" "-Dconf=.lein-env"]
  :source-paths ["src/clj"]
  :resource-paths ["resources"]
  :target-path "target/%s/"
  :main rest.core

  :plugins [[lein-cprop "1.0.1"]
            [lein-immutant "2.1.0"]]

  :profiles
  {:uberjar {:omit-source true
             :aot :all
             :uberjar-name "rest.jar"
             :source-paths ["env/prod/clj"]
             :resource-paths ["env/prod/resources"]}

   :dev           [:project/dev :profiles/dev]
   :test          [:project/dev :project/test :profiles/test]

   :project/dev  {:dependencies [[prone "1.1.4"]
                                 [ring/ring-mock "0.3.0"]
                                 [ring/ring-devel "1.5.1"]
                                 [pjstadig/humane-test-output "0.8.1"]]
                  :plugins      [[com.jakemccrary/lein-test-refresh "0.18.1"]
                                 [com.github.metaphor/lein-flyway "4.0.1"]]

                  :source-paths ["env/dev/clj" "test/clj"]
                  :resource-paths ["env/dev/resources"]
                  :repl-options {:init-ns user}
                  :injections [(require 'pjstadig.humane-test-output)
                               (pjstadig.humane-test-output/activate!)]}
   :project/test {:resource-paths ["env/test/resources"]
                  :plugins      [[com.jakemccrary/lein-test-refresh "0.18.1"]]}
   :profiles/dev {}
   :profiles/test {}}
   ;; Flyway Database Migration configuration
   :flyway {;; Database connection
            :url ~(-> "profiles.clj"
                    slurp
                    read-string
                    (get :profiles/dev)
                    (get :env)
                    (get :database-url))
            :locations ["filesystem:./resources/db-migrations"]
            }
  )
