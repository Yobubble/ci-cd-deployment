// pipeline{
//     environment{
//       registry = "yobubble62/nextjs-server"
//     }
//     agent any
//     stages{
//         stage('Initialize'){
//           def dockerHome = tool 'myDocker'
//           env.PATH = "${dockerHome}/bin:${env.PATH}"
//         }
//         stage("Dockerfile Build"){
//             steps{
//                 sh "docker build -t ${registry}:${env.BUILD_NUMBER} ."
//             }
//             post{
//                 always{
//                     echo "========HELLO docker build========"
//                 }
//                 success{
//                     echo "========Dockerfile build successfully========"
//                 }
//                 failure{
//                     echo "========Dockerfile build failed========"
//                 }
//             }
//         }
//         // stage("Test"){
//         //     agent {
//         //       docker{
//         //         imagge 'node:'
//         //       }
//         //     }
//         //     steps{
//         //         sh 'npm install'
//         //         sh 'npm run test'
//         //     }
//         //     post{
//         //         always{
//         //             echo "========HELLO test========"
//         //         }
//         //         success{
//         //             echo "========Test successfully========"
//         //         }
//         //         failure{
//         //             echo "========Test failed========"
//         //         }
//         //     }
//         // }
//         stage("Push to DockerHub"){
//           steps{
//             withCredentials([usernamePassword(credentialsId: 'dockerHub', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUsername')]) {
//             sh "docker login -u ${env.dockerHubUsername} -p ${env.dockerHubPassword}"
//             sh "docker push ${registry}:${env.BUILD_NUMBER}"
//         }''
//           }
//           post{
//                 always{
//                     echo "========HELLO C========"
//                 }
//                 success{
//                     echo "========DockerHub push successfully========"
//                 }
//                 failure{
//                     echo "========DockerHub push failed========"
//                 }
//             }
//         }
//     //     stage("Deploy to kubernetes"){
//     //         steps{
//     //             echo ""
//     //         }
//     //         post{
//     //             always{
//     //                 echo "========always========"
//     //             }
//     //             success{
//     //                 echo "========A executed successfully========"
//     //             }
//     //             failure{
//     //                 echo "========A execution failed========"
//     //             }
//     //         }
//     //     }
//     // }
//       // post{
//       //   always{
//       //       echo "========always========"
//       //   }
//       //   success{
//       //       echo "========pipeline executed successfully ========"
//       //   }
//       //   failure{
//       //       echo "========pipeline execution failed========"
//       //   }
//       // }
//     }
// }


// alternative

// node {
//   def app
//   stage('Initialize'){
//       def dockerHome = tool 'myDocker'
//       env.PATH = "${dockerHome}/bin:${env.PATH}"
//   }
//   stage('Build image') { 
//     app = docker.build("yobubble62/nextjs-server")    
//   }     
//   stage('Test image') {           
//     app.inside {       
//       sh 'npm install'
//       sh 'npm run test'
//     }    
//   }     
//   stage('Push image') {
//     docker.withRegistry('https://registry.hub.docker.com', 'dockerHub') {
//       app.push("${env.BUILD_NUMBER}") 
//       // app.push("latest")
//     }    
//   }
// }

// another alternative from ChatGPT

pipeline {
    agent any  // The entire pipeline can run on any available agent

    stages {
        stage('Build image') {
            agent { label 'docker' }  // This stage runs on an agent with the 'docker' label
            steps {
                script {
                    def app = docker.build("yobubble62/nextjs-server:${env.BUILD_NUMBER}")
                }
            }
        }
        stage('Test image') {
            agent { label 'docker' }  // This stage also runs on an agent with the 'docker' label
            steps {
                script {
                    def app = docker.image("yobubble62/nextjs-server:${env.BUILD_NUMBER}")
                    app.inside {
                        sh 'npm install'
                        sh 'npm run test'
                    }
                }
            }
        }
        stage('Push image') {
            agent { label 'docker' }  // This stage runs on an agent with the 'docker' label
            steps {
                script {
                    def app = docker.image("yobubble62/nextjs-server:${env.BUILD_NUMBER}")
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerHub') {
                        app.push("${env.BUILD_NUMBER}")
                        app.push("latest")
                    }
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline completed"
        }
    }
}


