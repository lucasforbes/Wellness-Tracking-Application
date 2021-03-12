package com.wellnessapp.demo.Diet;

public class SingleDiet {
    String item;
    String servingSize;
    int fat;
    int carbs;
    int calories;
    int protein;
    String picture;

    public SingleDiet(String item, String servingSize, int fat, int carbs, int calories, int protein, String picture) {
        this.item = item;
        this.servingSize = servingSize;
        this.fat = fat;
        this.carbs = carbs;
        this.calories = calories;
        this.protein = protein;
        this.picture = picture;
    }

    public String getItem() {
        return item;
    }

    public void setItem(String item) {
        this.item = item;
    }

    public String getServingSize() {
        return servingSize;
    }

    public void setServingSize(String servingSize) {
        this.servingSize = servingSize;
    }

    public int getFat() {
        return fat;
    }

    public void setFat(int fat) {
        this.fat = fat;
    }

    public int getCarbs() {
        return carbs;
    }

    public void setCarbs(int carbs) {
        this.carbs = carbs;
    }

    public int getCalories() {
        return calories;
    }

    public void setCalories(int calories) {
        this.calories = calories;
    }

    public int getProtein() {
        return protein;
    }

    public void setProtein(int protein) {
        this.protein = protein;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }
}
