class GithubStatusManagement {
  constructor() {
    this.username = '';
    this.userStatusURL = '';
    this.userStatus = '';
    this.company = '';
    this.repos = '';
    this.gists = '';
    this.followers = '';
    this.following = '';
    this.createdDate = '';
    this.location = '';
    this.blog = '';
  }

  loadHTML(username) {
    this.username = username;
    let url = `https://api.github.com/users/${username}`;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        this.userStatus = data;
      })
      .catch(error => {
        console.log('Fetch error: ', error.message);
      });
      
  }

  
updateProfile = function(){
  const obj = this.userStatus;
  let element = document.getElementById('public_repos');
  console.log(element);
  element.innerText = obj.public_repos;
  element = document.getElementById('public_gists');
  element.innerText = obj.public_gists;

}
  // parseUserStatus(userStatus){
  //   this.company = userStatus.company;
  //   this.repos = userStatus.public_repos;
  //   this.gists = userStatus.public_gists;
  //   this.followers = userStatus.followers;
  //   this.following = userStatus.following;
  //   this.createdDate = userStatus.created_at;
  //   this.location = userStatus.location;
  //   this.blog = userStatus.blog;
  // }
}
const githubStatusManagement = new GithubStatusManagement();

window.onload = function(){
  const inputElement = document.querySelector('.search_text_input');
  inputElement.addEventListener('keydown', function(e) {
    // 'Enter' 키를 확인
    if (e.key === 'Enter') {
      githubStatusManagement.loadHTML(e.target.value);     
    }
  });  
}
