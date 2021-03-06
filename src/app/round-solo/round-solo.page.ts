import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { RoundService } from '../services/round.service';
const TIPO_SOLO = "SOLO";
const STATUS_EM_ANDAMENTO = "EA";
@Component({
  selector: 'app-round-solo',
  templateUrl: './round-solo.page.html',
  styleUrls: ['./round-solo.page.scss'],
})
export class RoundSoloPage implements OnInit {
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
  roundId = 0;
  constructor(private route: ActivatedRoute,
    private service: RoundService,
    private toastController: ToastController,
    private alertController : AlertController,
    private loadingController : LoadingController,
    private router: Router) { }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Atenção!',
      message: 'Você irá sair da partida e não será possível retornar à mesma sala.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok!',
          handler: () => {
            this.router.navigateByUrl("/home")
          }
        }
      ]
    });

    await alert.present();
  }

  async presentLoading(message) {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: message
    });
    await loading.present();
  }

  dismissLoading(){
    this.loadingController.dismiss();
  }

  async novaPartida(){
    await this.presentLoading("Iniciando a partida...");
    let dados = {
      player1: this.round.player1,
      tipoPartida: TIPO_SOLO,
      statusRound: STATUS_EM_ANDAMENTO
    }

    this.service.startSolo(dados).toPromise()
      .then(res => {
        this.round = res;        
        this.dismissLoading();
        this.router.navigate(["/round-solo"], {queryParams: {id: res.id}});
      })
      .catch(err => {
        console.error(err);  
        this.presentToast(err.message)
        this.dismissLoading();
      })
    
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.roundId = params.id
      this.service.getById(this.roundId).toPromise()
        .then(res => {
          this.round = res;
         })
        .catch(err => {
          this.presentToast("Partida não encontrada.");
          this.router.navigateByUrl("home")
        })
    })
  }

  getRoundStatus(descricao) {
    switch (descricao) {
      case "Em andamento":
        return "EA"
        break;
      case "Finalizado":
        return "FI"
        break;
    }
  }

  play(linha, coluna) {
    if (this.round.board[linha][coluna] != '') {
      console.log("Movimento inválido");
      return;
    }
    let newBoard = this.round.board;
    newBoard[linha][coluna] = 'x';

    let newRound = {
      id: this.round.id,
      player1: this.round.player1,
      player2: this.round.player2,
      statusRound: this.getRoundStatus(this.round.statusRound.descricao),
      winner: this.round.winner,
      board: newBoard,
      tipoPartida: "SOLO",
      codigo: this.round.codigo,
      gameOver: this.round.gameOver,
      next: this.round.next
    }

    this.service.update(newRound).toPromise()
      .then(res => {
        this.round = res;
      })
      .catch(err => {
        console.log(err);

      })
      
  }

}
