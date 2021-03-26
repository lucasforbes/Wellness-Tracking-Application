package com.wellnessapp.demo.Diet;

import javax.persistence.Id;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

public class Diet {
    @Id
    int id;
    String email;
    String title;
    String description;
    SingleDiet[] dietList;
    Boolean paid;
    String picture;
    String videoLink;
    private List<Integer> userIdsToExersizesSubscribed;
    public Diet(String email, String title, String description, SingleDiet[] dietList, Boolean paid) {
        this.email = email;
        this.title = title;
        this.description = description;
        this.dietList = dietList;
        this.paid = paid;
        this.userIdsToExersizesSubscribed = new List<Integer>() {
            @Override
            public int size() {
                return 0;
            }

            @Override
            public boolean isEmpty() {
                return false;
            }

            @Override
            public boolean contains(Object o) {
                return false;
            }

            @Override
            public Iterator<Integer> iterator() {
                return null;
            }

            @Override
            public Object[] toArray() {
                return new Object[0];
            }

            @Override
            public <T> T[] toArray(T[] a) {
                return null;
            }

            @Override
            public boolean add(Integer integer) {
                return false;
            }

            @Override
            public boolean remove(Object o) {
                return false;
            }

            @Override
            public boolean containsAll(Collection<?> c) {
                return false;
            }

            @Override
            public boolean addAll(Collection<? extends Integer> c) {
                return false;
            }

            @Override
            public boolean addAll(int index, Collection<? extends Integer> c) {
                return false;
            }

            @Override
            public boolean removeAll(Collection<?> c) {
                return false;
            }

            @Override
            public boolean retainAll(Collection<?> c) {
                return false;
            }

            @Override
            public void clear() {

            }

            @Override
            public Integer get(int index) {
                return null;
            }

            @Override
            public Integer set(int index, Integer element) {
                return null;
            }

            @Override
            public void add(int index, Integer element) {

            }

            @Override
            public Integer remove(int index) {
                return null;
            }

            @Override
            public int indexOf(Object o) {
                return 0;
            }

            @Override
            public int lastIndexOf(Object o) {
                return 0;
            }

            @Override
            public ListIterator<Integer> listIterator() {
                return null;
            }

            @Override
            public ListIterator<Integer> listIterator(int index) {
                return null;
            }

            @Override
            public List<Integer> subList(int fromIndex, int toIndex) {
                return null;
            }
        };
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public SingleDiet[] getDietList() {
        return dietList;
    }

    public List<Integer> getUserIdsToExersizesSubscribed() {
        return userIdsToExersizesSubscribed;
    }

    public void setUserIdsToExersizesSubscribed(List<Integer> userIdsToExersizesSubscribed) {
        this.userIdsToExersizesSubscribed = userIdsToExersizesSubscribed;
    }

    public void setDietList(SingleDiet[] dietList) {
        this.dietList = dietList;
    }

    public Boolean getPaid() {
        return paid;
    }

    public void setPaid(Boolean paid) {
        this.paid = paid;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getVideoLink() {
        return videoLink;
    }

    public void setVideoLink(String videoLink) {
        this.videoLink = videoLink;
    }
}
