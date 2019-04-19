/**
 * @file app.proclamation.page.ts
 * @author zhouminghui
 * @description 公告页
*/

import {Component, OnInit} from '@angular/core';

declare let $: any;
@Component({
    selector: 'app-proclamation',
    templateUrl: './app.proclamation.page.html',
    styleUrls: ['./app.proclamation.page.css']
})



export class ProclamationPageComponent implements OnInit {
    public datalist: any[] = [];
    public itemData: any;
    public showModal = 'hide';
    public carouselData: any;
    public bodyScroll: any;
    public paginateData: any;
    public total: any;


    ngOnInit() {
        this.datalist = [
            {
                key: '0',
                title: '针对近期个别组织以“aelf官方”名义开展“ELF空投”活动的声明',
                date: '2019/01/25',
                content: '<p class="fs-30 shares mb30">针对近期个别组织以“aelf官方”名义开展“ELF空投”活动的声明</p>' +
                        '<p class="fs-20 shares  mb30">2019/01/25</p>' +
                        '<p class="mb30">近期，aelf团队接到用户举报，市场上有个别组织盗取aelf官网内容，骗取用户信任，制作了虚假的“ELF空投网站”，以“ELF空投”的名义开展诈骗活动，骗取用户私钥，盗取用户钱包财产，损害用户利益。</p>' +
                        '<p class="mb30 shares"><img src="assets/newImages/notice-01-01.png" width="50%"></p>' +
                        '<p class="mb30">假冒的ELF空投网站为：https://aelfairdrop.com，此网站诱导用户输入私钥， 用户一旦输入私钥, 资产即会丢失被盗。</p>' +
                        '<p class="mb30">aelf官方特在此声明：</p>' +
                        '<p class="mb30">除aelf官方积分奖励系统以及官方指定机构联合举办的空投活动之外，aelf从未授权过任何组织及个人举办此类型的活动。</p>' +
                        '<p class="mb30">aelf官方积分奖励系统为：</p>' +
                        '<p class="mb30"> Candy System（<a href="https://candy.aelf.io" style="color-bule">https://candy.aelf.io</a>)</p>' +
                        '<p class="mb30">在此，aelf提醒用户提高警惕，谨防上当受骗，切实维护好自身利益。针对以aelf名义或aelf合作方名义进行的虚假宣传等行为，aelf将保留追究其法律责任的权益。对于此类对用户进行诈骗等行为，aelf绝不姑息，再次提醒广大aelf爱好者，注意防范风险。</p>',
                carousel: '<img src="assets/newImages/notice-01.jpg" width="100%" alt="针对近期个别组织以“aelf官方”名义开展“ELF空投”活动的声明">',
                hot: true
            },
            {
                key: '1',
                title: '关于aelf宣布合作的官方渠道声明',
                date: '2019/01/25',
                content: '<p class="fs-30 shares mb30">关于aelf宣布合作的官方渠道声明</p>' +
                        '<p class="fs-20 shares mb30">2019/01/25</p>' +
                        '<p class="mb30">尊敬的aelf用户：</p>' +
                        '<p class="mb30">aelf通常只会通过官方微信、微博及Twitter等平台发布战略合作及活动信息，除此之外，任何其他媒体流传的与aelf达成战略合作或活动的通知公告，均为不实消息。</p>' + 
                        '<p class="mb30">aelf官方平台为：</p>' +
                        '<p class="shares mb30"><img src="assets/newImages/notice-02-01.png" width="50%" ></p>' +
                        '<p class="mb30 shares">微信公众号：<span class="color-red">aelf社区（aelf-shequ）</span></p>' +
                        '<p class="shares mb30"><img src="assets/newImages/notice-02-02.png" width="50%" ></p>' +
                        '<p class="mb30 shares">微博：<span class="color-red">aelf中文社区</span></p>' +
                        '<p class="shares mb30"><img src="assets/newImages/notice-02-03.png" width="50%" ></p>' +
                        '<p class="mb30 shares">Twitter：<span class="color-red">@aelfblockchain</span></p>',
                carousel: '<img src="assets/newImages/notice-02.jpg" width="100%"   alt="关于aelf宣布合作的官方渠道声明">',
                hot: true
            }
        ];

        this.paginateData = this.datalist.slice(0, 5);
        this.total = this.datalist.length;
        this.carouselData = this.datalist.filter(item => {
            return item.hot;
        });
    }

    getChildEvent(item: object) {
        this.itemData = item;
        this.showModal = 'show';
        $('body').css({'overflow': 'hidden'});
    }

    closeModal(isShow: boolean) {
        this.showModal = 'hide';
        $('body').css({'overflow': 'auto'});
    }

    paginate(e) {
        this.paginateData = this.datalist.slice(e.first, e.first + e.rows);
    }
}
