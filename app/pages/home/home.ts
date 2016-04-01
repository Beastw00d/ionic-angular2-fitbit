import {Page, NavController} from 'ionic-angular';
import {DetailsPage} from '../details/details'
import {GithubService} from '../../services/github';


@Page({
  templateUrl: 'build/pages/home/home.html',
  providers: [GithubService]
})
export class HomePage {
    public foundRepos;
    public username;
    
    constructor(private github: GithubService,
                private nav: NavController) {
        
    }
    
    getRepos() {
        this.github.getRepos(this.username).subscribe(
            data => {
                this.foundRepos = data.json();
            },
            err => console.error(err),
            () => console.log('getRepos completed')
        );
    }
    
    goToDetails(repo) {
        this.nav.push(DetailsPage, {repo: repo});
    }
}
