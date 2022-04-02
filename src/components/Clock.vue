<template>
    <div>
        {{clock}}        
    </div>
</template>

<script>
export default {
    data: () => ({
            dayWeekNames: ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"],
            dayMonthNames: ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
            dayWeek: '',
            day: 0,
            month: '',
            year: 0,
            hours: '',
            minutes: '',
            seconds: ''  
    }),
    
    created() {
        setInterval(() => {
            this.updateClock()
        }, 1000);
    },
    methods: {
        updateClock() {
            let date = new Date()
            this.dayWeek = this.dayWeekNames[date.getDay()]   
            this.day = date.getDate()
            this.month = this.dayMonthNames[date.getMonth()]
            this.year = date.getFullYear()
            /* this.hours = date.getHours().toString().length < 2 ? "0" + date.getHours() : date.getHours() 
            this.minutes = date.getMinutes().toString().length < 2 ? "0" + date.getMinutes() : date.getMinutes()
            this.seconds = date.getSeconds().toString().length < 2 ? "0" + date.getSeconds() : date.getSeconds() */
        }
    },
    computed: {
        clock() {
            return `${this.dayWeek}, ${this.day} de ${this.month} de ${this.year}` //- ${this.hours} : ${this.minutes} : ${this.seconds}`
        }
    }
}
</script>