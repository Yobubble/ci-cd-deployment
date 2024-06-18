// pipeline{
//   environment{
//     registry = "yobubble62/go-hello-world"
//   }
//   agent any
//   stages{
//     stage("Ensure Docker is working"){
//       steps{
//         sh 'docker ps'
//       }
//     }
//     stage("Docker Image Build"){
//       steps{

//         // withCredentials([usernamePassword(credentialsId: 'dockerHub', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUsername')]) {
          
//         // }
//       }
//     }
//   }
// }

node{
  def app
  stage("Ensure Docker is working"){
    steps{
      sh 'docker ps'
    }
  }
  stage('Build image') {
    app = docker.build("yobubble62/go-hello-world:${env.BUILD_NUMBER}")
  }
  stage('Test image') {
    app.inside {     
      sh 'echo "Tests passed"'
    }
  }   
  // stage('Push image') {
  // }
}