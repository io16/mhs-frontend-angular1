import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-auction-round-type',
  templateUrl: './auction-round-type.component.html',
  styleUrls: ['./auction-round-type.component.css']
})
export class AuctionRoundTypeComponent implements OnInit {

  gameServiceFactory;
  showInputs: Boolean;
  editStateText:string;
  @Input() disableNext: Boolean;
  @Input() results;
  @Output() saved = new EventEmitter<any>();
  @Output() disableNextChange = new EventEmitter<any>();
  round;
  routeParams;

  constructor(@Inject('GameServiceFactory') gameServiceFactory,
              @Inject('$routeParams') routeParams) {
    this.gameServiceFactory = gameServiceFactory;
    this.routeParams = routeParams;
  }

  ngOnInit() {
    this.showInputs = true;
    this.editStateText = 'Correctness';
    console.log(this.routeParams.gameId);


    this.gameServiceFactory.getRoundByGameAndId(this.routeParams.gameId, this.routeParams.roundNumber)
      .then((round) => {
        this.round = round;
        console.log(this.round);
      });
    console.log(this.results);
  }

  private getCheckboxValue(status){
    return status ? 1 : -1;
  }

  onSave(result){

    result.score = result.rate * this.getCheckboxValue(result.status);
    console.log(result);
    this.saved.emit(result);
  }

  switchEditState() {
    this.disableNext = !this.disableNext;
    this.disableNextChange.emit(this.disableNext);
    this.showInputs = !this.showInputs;
    if (!this.showInputs) {
      this.results.forEach((item) => {
        if (item.status < 0) {
          item.checked = false;
        }
        else {
          item.checked = true;
        }
      });
    }
    else {
      this.results.forEach((item) => {
        delete item["auction"];

        if (item.score !== 0 && item.score !== undefined) {
          item.checked = true;
        }
        else {
          item.checked = false;
        }
      });
    }
    !this.showInputs? this.editStateText = 'Score': this.editStateText = 'Correctness';
  }

}
