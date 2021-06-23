<template>
    <section id="tables" class="tables">
        <div class="tables__block">

            <div class="tables__string">
                <div class="tables__container container">
                    <div class="tables__cell">№ заказа:</div>
                    <div class="tables__cell">{{ROAT_LIST.head.order_number}}</div>
                </div>
            </div>

            
            <div class="tables__string">
                <div class="tables__container container">
                    <div class="tables__cell">Клиент:</div>
                    <div class="tables__cell">ООО "Рога и копыта"</div>
                </div>
            </div>

            <div class="tables__string">
                <div class="tables__container container">
                    <div class="tables__cell">Номенклатура:</div>
                    <div class="tables__cell">{{ROAT_LIST.head.nam}}</div>
                </div>
            </div>

            <div class="tables__string">
                <div class="tables__container container">
                    <div class="tables__cell">Спецификация:</div>
                    <div class="tables__cell">{{ROAT_LIST.head.sp}}</div>
                </div>
            </div>

            <div class="tables__string">
                <div class="tables__container container">
                    <div class="tables__cell">Количество:</div>
                    <div class="tables__cell">{{ROAT_LIST.head.count}}</div>
                </div>
            </div>

            <div class="tables__string">
                <div class="tables__container container">
                    <div class="tables__cell">№ бухты:</div>
                    <div class="tables__cell">{{ROAT_LIST.head.buhta_number}}</div>
                </div>
            </div>

            <div class="tables__string">
                <div class="tables__container container">
                    <div class="tables__cell">Расчетный срок:</div>
                    <div class="tables__cell">30.12.2021</div>
                </div>
            </div>



            <div class="tables__string">
                <div class="tables__container container">
                    <div class="tables__cell">Плановый срок:</div>
                    <div class="tables__cell">11.12.2021</div>
                </div>
            </div>



            <div class="tables__string">
                <div class="tables__container big container">
                    <div class="tables__cell">Примечание:</div>
                    <div class="tables__cell">{{ROAT_LIST.head.description_krt}}</div>
                </div>
            </div>

        </div>
    </section>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    computed: {
        ...mapGetters (["ROAT_LIST"])
    }
}
</script>

<style>

</style>