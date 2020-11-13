import { Component, Input,Output, EventEmitter } from '@angular/core';
import { Award, AwardsService } from '../../core';
// import { Award, AwardsService } from '../../../assets/logo-web.png';

@Component({
  selector: 'app-award-preview',
  styleUrls: ['award-preview.component.css'],
  templateUrl: './award-preview.component.html'
})
export class AwardPreviewComponent{
  @Input() award: Award;
  @Output() refresh_list = new EventEmitter<string>();
  constructor (
    private awardsService: AwardsService,
) {}
  // @Input() test: Award;
  isDeleting = false;

    deleteAward() {
        this.isDeleting = true;
        this.awardsService.destroy(this.award.id).subscribe(success => {
            
            console.log(this.award.id);
            //enviamos un emit al parent. (lo recoge en award-list component)
            this.refresh_list.next();
        }
        );
    }

}