// pipeline{
//     environment{
//       registry = "yobubble62/nextjs-server"
//     }
//     agent{
//       docker{
//           image 'docker:latest'
//           // args '-v /var/run/docker.sock:/var/run/docker.sock'
//       }
//     }
//     stages{
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

node {
  def app
  stage('Initialize'){
      def dockerHome = tool 'myDocker'
      env.PATH = "${dockerHome}/bin:${env.PATH}"
  }
  stage('Build image') { 
    app = docker.build("yobubble62/nextjs-server")    
  }     
  stage('Test image') {           
    app.inside {       
      sh 'npm install'
      sh 'npm run test'
    }    
  }     
  stage('Push image') {
    docker.withRegistry('https://registry.hub.docker.com', 'dockerHub') {
      app.push("${env.BUILD_NUMBER}") 
      // app.push("latest")
    }    
  }
}


