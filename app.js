var app = Vue.createApp({
    data(){
        return{
            appTitle: "Ticket Booking App",

            ticketStatusBars: {
                avaiable: {
                    text: 'Avaiable',
                    color: 'rgb(238, 238, 238)'
                },
                select: {
                    text: 'Select',
                    color: 'rgb(2, 212, 2)'
                },
                sold: {
                    text: 'Sold',
                    color: 'rgb(243, 19, 19)'
                },
                booked: {
                    text: 'Booking',
                    color: 'rgb(73, 73, 73)'
                }

            },

            seats: [
                {
                  name: "A1",
                  type: "available",
                  price: 500
                },
                {
                  name: "A2",
                  type: "available",
                  price: 500
                },
                {
                  name: "A3",
                  type: "sold",
                  price: 500
                },
                {
                  name: "A4",
                  type: "available",
                  price: 500
                },
                {
                  name: "B1",
                  type: "available",
                  price: 450
                },
                {
                  name: "B2",
                  type: "available",
                  price: 450
                },
                {
                  name: "B3",
                  type: "available",
                  price: 450
                },
                {
                  name: "B4",
                  type: "available",
                  price: 450
                },
                {
                  name: "C1",
                  type: "sold",
                  price: 500
                },
                {
                  name: "C2",
                  type: "available",
                  price: 500
                },
                {
                  name: "C3",
                  type: "available",
                  price: 500
                },
                {
                  name: "C4",
                  type: "sold",
                  price: 500
                },
                {
                  name: "D1",
                  type: "available",
                  price: 400
                },
                {
                  name: "D2",
                  type: "available",
                  price: 400
                },
                {
                  name: "D3",
                  type: "available",
                  price: 400
                },
                {
                  name: "D4",
                  type: "available",
                  price: 400
                },
                {
                  name: "E1",
                  type: "available",
                  price: 300
                },
                {
                  name: "E2",
                  type: "available",
                  price: 300
                },
                {
                  name: "E3",
                  type: "booked",
                  price: 300
                },
                {
                  name: "E4",
                  type: "booked",
                  price: 300
                },
                {
                  name: "F1",
                  type: "available",
                  price: 300
                },
                {
                  name: "F2",
                  type: "available",
                  price: 300
                },
                {
                  name: "F3",
                  type: "available",
                  price: 300
                },
                {
                  name: "F4",
                  type: "available",
                  price: 300
                }
                ,
                {
                  name: "G1",
                  type: "available",
                  price: 300
                },
                {
                  name: "G2",
                  type: "available",
                  price: 300
                },
                {
                  name: "G3",
                  type: "available",
                  price: 300
                },
                {
                  name: "G4",
                  type: "available",
                  price: 300
                }
            ],

            appliedCoupon: null,
            couponCode: "",
            coupons: [
              {
                code: "100TAKAOFF",
                discount: 100
              },
              {
                code: "200TAKAOFF",
                discount: 200
              }
            ],
            name:"",
            mobile:"",
            confirmed: false,

        };
    },
    computed:{
        slectSeats(){
            let sc = this.seats.filter((item) => item.type === "select");
            return sc;
        },
        totalCost(){
            let tc = 0;
            this.slectSeats.forEach(seat => {
                tc = tc + seat.price;
            });
            if(this.appliedCoupon !== null){
                tc = tc - this.appliedCoupon.discount;
            }
            return tc;
        }
    },
    methods: {
        handleClick(index){
            clickdSeat = this.seats[index];
            if(clickdSeat.type == 'sold' || clickdSeat.type == 'booked'){
                alert("You can't select this seat");
                return;
            }
            if(clickdSeat.type == 'available' && this.slectSeats.length > 2){
                alert("You can select max 3 seats");
                return;
            } 
            clickdSeat.type = (clickdSeat.type === 'select') ? 'avaiable' : 'select';
        },
        confirm() {
            if (!this.name || !this.mobile) {
              alert("Please enter name and mobile");
              return;
            }
      
            this.confirmed = true;
        },
        resetData(){
            this.confirmed = false;
            this.name = "";
            this.mobile = "";
            this.appliedCoupon = null;

            this.seats.forEach((seat) => {
                if (seat.type === "select") {
                seat.type = "sold";
                }
            });
        }
    },
    watch:{
        couponCode(newValue){
            if(newValue.length == 10){
                let searchedCoupons = this.coupons.filter(
                    (item) => item.code === newValue
                );

                if (searchedCoupons.length === 1) {
                    this.appliedCoupon = searchedCoupons[0];
                    this.couponCode = "";
                } else {
                    
                    alert("Coupon not valid!");
                }

            }
        }
    }
});
app.mount("#main_app");
