import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { RoundService } from '../services/round.service';
const STATUS_AGUARDANDO_OPONENTE = "AO";
@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.page.html',
  styleUrls: ['./lobby.page.scss'],
})
export class LobbyPage implements OnInit {
  roundid = 0;
  round = {
    id: 0,
    player1: "",
    player2: "",
    statusRound: {
      descricao: ""
    },
    winner: null,
    next: null,
    board: [
      [
        "",
        "",
        ""
      ],
      [
        "",
        "",
        ""
      ],
      [
        "",
        "",
        ""
      ]
    ],
    tipoPartida: {
      descricao: ""
    },
    codigo: 0,
    gameOver: false
  };
  constructor(private route: ActivatedRoute,
    private service: RoundService,
    private router: Router,
    private toastController: ToastController) { }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.roundid = params.id;
    })

    this.service.getById(this.roundid).toPromise()
      .then(res => {
        this.round = res;
        this.verificaStatus();
      })
      .catch(err => {
        this.presentToast("Partida não encontrada.");
        this.router.navigateByUrl("home")
      })
  }

  verificaStatus() {
    this.service.getById(this.roundid).toPromise()
      .then(res => {
        this.round = res;
      })
      .catch(err => {
        this.presentToast("Partida não encontrada.");
        this.router.navigateByUrl("home")
      })

    if(this.round.statusRound.descricao == "Aguardando oponente"){
      setTimeout(() => {
        this.verificaStatus();
      }, 2000);
    }else{
      this.router.navigate(["/round-multiplayer"], {queryParams: {id: this.round.id, nickname: this.round.player1}});
    }
  }
}
