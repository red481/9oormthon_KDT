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
    this.userRepos = '';
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
        this.updateProfile();
        
      })
      .then(()=>{
        this.loadLatestRepos();
      })
      .catch(error => {
        console.log('Fetch error: ', error.message);
      });
      
  }

  loadLatestRepos(){
    const URL = this.userStatus.repos_url;
    fetch(URL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok!!');
        }        
        response.json().then(result => {
          this.userRepos = result;
          this.parseUserReposAndPrint();
        });
      })
      .catch(error => {
        console.log('Fetch error: ', error.message);
      });
  }
  
  parseUserReposAndPrint = function(){
    const containerTag = document.querySelector('.latest_repos');
    let insertTag = `<div class="section">
    <div class="repo_name"><p>react-disney-deploy-test</p></div>
    <div class="additory_information">
      <div class="detail_of_additory_information" id="star">Stars: </div>
      <div class="detail_of_additory_information" id="whatcher">Whatchers: </div>
      <div class="detail_of_additory_information" id="fork">Forks: </div>
    </div>
  </div>`;
    if(this.userRepos.length < 1){
      return;
    }
    this.userRepos.forEach((repo, idx, array)=>{
      containerTag.insertAdjacentHTML('beforeend', insertTag);
      let repoSection = containerTag.lastElementChild;
      repoSection.children[0].innerText = repo.name;
      let tagToEdit = repoSection.children[1];
      
      let divElement = tagToEdit.children[0];
        divElement.innerText = `Stars: ${repo.stargazers_count}`;
        divElement = tagToEdit.children[1];
        divElement.innerText = `Whatchers: ${repo.watchers}`;
        divElement = tagToEdit.children[2];
        divElement.innerText = `Forks: ${repo.forks}`;
      });
  }

updateProfile = function(){
  const obj = this.userStatus;
  let element = document.getElementById('public_repos');
  element.innerText = `public repos : ${obj.public_repos}`;
  element = document.getElementById('public_gists');
  element.innerText = `public gists : ${obj.public_gists}`;
  element = document.getElementById('followers');
  element.innerText = `followers : ${obj.followers}`;
  element = document.getElementById('following');
  element.innerText = `following : ${obj.following}`;
  element = document.getElementById('company');
  element.innerText = `company : ${obj.company}`;
  element = document.getElementById('website_blog');
  element.innerText = `website/blog : ${obj.blog}`;
  element = document.getElementById('location');
  element.innerText = `location : ${obj.location}`;
  element = document.getElementById('member_since');
  element.innerText = `member since : ${obj.created_at}`;
  element = document.querySelector('.profile_image');
  element.innerHTML = `<img src=${obj.avatar_url} alt="profileIMG">`
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
