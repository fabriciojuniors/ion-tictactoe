import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { RoundService } from '../services/round.service';

@Component({
  selector: 'app-round-multiplayer',
  templateUrl: './round-multiplayer.page.html',
  styleUrls: ['./round-multiplayer.page.scss'],
})
export class RoundMultiplayerPage implements OnInit {
  roundid = 0;
  nickname = "";
  player = 0;
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
  constructor(private route : ActivatedRoute,
              private service : RoundService,
              private toastController : ToastController,
              private router : Router,
              private alertController : AlertController) { }

  ngOnInit() {
    this.round = {
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
    this.route.queryParams.subscribe(params => {
      this.roundid = params.id;
      this.nickname = params.nickname;
    })

    this.service.getById(this.roundid).toPromise()
      .then(res => {
        this.round = res;        
        if(this.round.statusRound.descricao == "Finalizada"){
          this.presentToast("Partida já finalizada");
          this.router.navigateByUrl("home")  
        }

        if(this.round.player1 == this.nickname){
          this.player = 1;
        }else{
          this.player = 2;
          this.verificaStatus();
        }
      })
      .catch(err => {
        this.presentToast(err.message);
        this.router.navigateByUrl("home")
      })
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  getRoundStatus(descricao) {
    switch (descricao) {
      case "Em andamento":
        return "EA"
        break;
      case "Finalizado":
        return "FI"
        break;
      case "Aguardando oponente":
        return "AO"
        break;        
    }
  }

  play(linha, coluna) {
    if(this.round.next != this.nickname){
      console.log("Próximo: " + this.round.next);
      console.log("Nick: "+ this.nickname);
      
      
      console.log("Não é a sua vez");
      return;      
    }
    if (this.round.board[linha][coluna] != '') {
      console.log("Movimento inválido");
      return;
    }
    let newBoard = this.round.board;
    newBoard[linha][coluna] = this.player == 1 ? 'x' : 'o';

    let proximo = "";
    if(this.round.next == this.round.player1){
      proximo = this.round.player2;
    }else{
      proximo = this.round.player1;
    }

    console.log("O proximo será: " + proximo);
    

    let newRound = {
      id: this.round.id,
      player1: this.round.player1,
      player2: this.round.player2,
      statusRound: this.getRoundStatus(this.round.statusRound.descricao),
      winner: this.round.winner,
      board: newBoard,
      tipoPartida: "DUO",
      codigo: this.round.codigo,
      gameOver: this.round.gameOver,
      next: proximo
    }

    this.service.update(newRound).toPromise()
      .then(res => {
        this.round = res;
        this.verificaStatus();
      })
      .catch(err => {
        console.log(err);
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
  
      if((this.player == 1 && this.round.next == this.round.player2) || (this.player == 2 && this.round.next == this.round.player1)){
        setTimeout(() => {
          this.verificaStatus();
        }, 200);
      }
    }
    sair(){
      this.router.navigateByUrl("/home")
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

}
