package com.wellnessapp.demo.Creator;

public class WithdrawDetails {
    private String email;
    private String routingNumber;
    private String accountNumber;

    public WithdrawDetails(String email, String routingNumber, String accountNumber) {
        this.email = email;
        this.routingNumber = routingNumber;
        this.accountNumber = accountNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRoutingNumber() {
        return routingNumber;
    }

    public void setRoutingNumber(String routingNumber) {
        this.routingNumber = routingNumber;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }
}