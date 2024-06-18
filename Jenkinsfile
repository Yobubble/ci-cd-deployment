pipeline{
    environment{
      registry = "yobubble62/nextjs-server"
    }
    agent any
    stages{
        stage("Dockerfile Build"){
            steps{
                sh 'docker build -t ${registry}:${env.BUILD_NUMBER}' 
            }
            post{
                always{
                    echo "========HELLO docker build========"
                }
                success{
                    echo "========Dockerfile build successfully========"
                }
                failure{
                    echo "========Dockerfile build failed========"
                }
            }
        }
        stage("Test"){
            steps{
                sh 'npm install'
                // this still not work because no test command in repo
                // sh 'npm run test'
            }
            post{
                always{
                    echo "========HELLO test========"
                }
                success{
                    echo "========Test successfully========"
                }
                failure{
                    echo "========Test failed========"
                }
            }
        }
        stage("Push to DockerHub"){
          steps{
            withCredentials([usernamePassword(credentialsId: 'dockerHub', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUsername')]) {
            sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPassword}"
            sh 'docker push ${registry}:${env.BUILD_NUMBER}'
        }
          }
          post{
                always{
                    echo "========HELLO C========"
                }
                success{
                    echo "========DockerHub push successfully========"
                }
                failure{
                    echo "========DockerHub push failed========"
                }
            }
        }
    //     stage("Deploy to kubernetes"){
    //         steps{
    //             echo ""
    //         }
    //         post{
    //             always{
    //                 echo "========always========"
    //             }
    //             success{
    //                 echo "========A executed successfully========"
    //             }
    //             failure{
    //                 echo "========A execution failed========"
    //             }
    //         }
    //     }
    // }
      post{
        always{
            echo "========always========"
        }
        success{
            echo "========pipeline executed successfully ========"
        }
        failure{
            echo "========pipeline execution failed========"
        }
      }
    }
}