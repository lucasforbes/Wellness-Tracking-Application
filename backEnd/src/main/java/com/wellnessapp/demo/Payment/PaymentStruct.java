package com.wellnessapp.demo.Payment;

public class PaymentStruct {
    public String userEmail;
    public String obj;
    public Payment payment;

    public PaymentStruct(String userEmail, String obj, Payment payment) {
        this.userEmail = userEmail;
        this.obj = obj;
        this.payment = payment;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getObj() {
        return obj;
    }

    public void setObj(String obj) {
        this.obj = obj;
    }

    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }
}
