import {Page, NavController, NavParams} from 'ionic-angular';
import {GithubService} from '../../services/github';

@Page({
    templateUrl: 'build/pages/details/details.html',
    providers: [GithubService]
})
export class DetailsPage {
    public readme = '';
    public repo;

    constructor(private github: GithubService,
        private nav: NavController,
        private navParams: NavParams) {

        this.repo = navParams.get('repo');
        
        this.github.getDetails(this.repo).subscribe(
            data => this.readme = data.text(),
            err => {
                if (err.status == 404) {
                    this.readme = 'This repo does not have a README. :()'
                } else {
                    console.error(err);
                }
            },
            () => console.log('getDetails completed')
        );

    }

    ngOnInit() { }

}