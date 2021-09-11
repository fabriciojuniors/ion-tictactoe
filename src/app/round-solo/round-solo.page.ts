import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { RoundService } from '../services/round.service';

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
      message: 'Você irá sair da partida e nã será possível retornar à mesma sala.',
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


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.roundId = params.id
      this.service.getById(this.roundId).toPromise()
        .then(res => {
          console.log(res);
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
    if (this.round.board[linha][coluna] != '-') {
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
      gameOver: this.round.gameOver
    }
    console.log(newRound);
    

    this.service.update(newRound).toPromise()
      .then(res => {
        this.round = res
        console.log("---------");
        
        console.log(this.round);
        console.log("---");
        
        
      })
      .catch(err => {
        console.log(err);

      })

  }

}
