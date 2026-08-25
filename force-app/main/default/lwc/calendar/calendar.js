import { LightningElement, track } from 'lwc';

export default class CalendarLwc extends LightningElement {

    @track days = [];

    currentDate = new Date();

    weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    connectedCallback() {
        this.generateCalendar();
    }

    get monthYear() {
        return this.currentDate.toLocaleString('default', {
            month: 'long',
            year: 'numeric'
        });
    }

    generateCalendar() {

        this.days = [];

        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();

        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            this.days.push({
                key: 'blank' + i,
                value: '',
                className: 'day blank'
            });
        }

        const today = new Date();

        for (let i = 1; i <= lastDate; i++) {

            let cssClass = 'day';

            if (
                i === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear()
            ) {
                cssClass += ' today';
            }

            this.days.push({
                key: i,
                value: i,
                date: `${year}-${month + 1}-${i}`,
                className: cssClass
            });
        }
    }

    previousMonth() {
        this.currentDate =
            new Date(
                this.currentDate.getFullYear(),
                this.currentDate.getMonth() - 1,
                1
            );

        this.generateCalendar();
    }

    nextMonth() {
        this.currentDate =
            new Date(
                this.currentDate.getFullYear(),
                this.currentDate.getMonth() + 1,
                1
            );

        this.generateCalendar();
    }

    handleDateClick(event) {
        const selectedDate = event.currentTarget.dataset.date;

        if (selectedDate) {
            console.log('Selected Date:', selectedDate);
        }
    }
}