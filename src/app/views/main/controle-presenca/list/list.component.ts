import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ApiService} from '../../../../core/api/api.service';
import {UiToolbarService} from 'ng-smn-ui';
import {enterLeaveViewAnimation} from '../../../../core/utils/animations/enter-leave-view.animations';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    animations: [
        enterLeaveViewAnimation
    ]
})
export class ListComponent implements OnInit, AfterViewInit {
    list;
    filterOpen: boolean;
    loadingInit: boolean;
    statusList;
    disciplinas;
    turmas;
    dataInicial;
    dataFinal;
    filtro;
    totalLinhas;
    pagina: number;

    constructor(
        private api: ApiService,
        private toolbar: UiToolbarService
    ) {
        this.filtro = {};
        this.filterOpen = false;
        this.loadingInit = false;
        this.pagina = 1;
    }

    ngOnInit() {
        this.getControlesPresencas(null);
        this.getStatus();
        this.getDisciplina();
        this.getTurma();
    }

    ngAfterViewInit() {
        this.toolbar.activateExtendedToolbar(600);
    }

    getControlesPresencas(filtro) {
        console.log(this.filtro);
        this.loadingInit = true;
        this.api.prep(
            'administracao',
            'controlePresenca',
            'selecionar'
        ).call({
            pagina: !!filtro ? 1 : this.pagina,
            ...this.filtro
        })
            .subscribe(
                res => {
                    this.list = res.content;
                    this.totalLinhas = res.totalLinhas;
                }, null,
                () => {
                    this.loadingInit = false;
                });
    }

    getStatus() {
        this.api.prep(
            'administracao',
            'status',
            'selecionarSimples'
        ).call()
            .subscribe(res => {
                    this.statusList = res.content;
                }, null,
                () => {

                }
            );
    }

    getDisciplina() {
        this.api.prep(
            'administracao',
            'disciplina',
            'selecionar'
        ).call()
            .subscribe(res => {
                    this.disciplinas = res.content;
                }, null,
                () => {

                }
            );
    }

    getTurma() {
        this.api.prep(
            'administracao',
            'turma',
            'selecionar'
        ).call()
            .subscribe(res => {
                    this.turmas = res.content;
                }, null,
                () => {

                }
            );
    }

    /*TODO
    * idTurma: 237
    * unifasystem-api.herokuapp.com/disciplinas?idTurma=237
    * */

}