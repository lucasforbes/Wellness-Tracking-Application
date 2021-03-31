package com.wellnessapp.demo.Payment;

import java.time.Clock;
import java.time.LocalDate;
import java.time.Period;

public class Payment {
    String cardNumber;
    String cvv;
    LocalDate date;
    public Payment(String cardNumber, String cvv, String date){
        this.cardNumber = cardNumber;
        this.cvv = cvv;
        Clock cl = Clock.systemUTC();
        LocalDate currentDate = LocalDate.now(cl);
        this.date = LocalDate.parse(date);
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getCvv() {
        return cvv;
    }

    public void setCvv(String cvv) {
        this.cvv = cvv;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
