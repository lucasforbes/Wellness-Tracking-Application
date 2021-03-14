package com.wellnessapp.demo.Exersize;

import javax.persistence.Id;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

public class Exersize {
    int userID;
    @Id
    int workoutID;
    List<SingleExersize> allExersizes;
    public Exersize(int creatorID){
        this.userID = creatorID;
        allExersizes = new List<SingleExersize>() {
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
            public Iterator<SingleExersize> iterator() {
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
            public boolean add(SingleExersize singleExersize) {
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
            public boolean addAll(Collection<? extends SingleExersize> c) {
                return false;
            }

            @Override
            public boolean addAll(int index, Collection<? extends SingleExersize> c) {
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
            public SingleExersize get(int index) {
                return null;
            }

            @Override
            public SingleExersize set(int index, SingleExersize element) {
                return null;
            }

            @Override
            public void add(int index, SingleExersize element) {

            }

            @Override
            public SingleExersize remove(int index) {
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
            public ListIterator<SingleExersize> listIterator() {
                return null;
            }

            @Override
            public ListIterator<SingleExersize> listIterator(int index) {
                return null;
            }

            @Override
            public List<SingleExersize> subList(int fromIndex, int toIndex) {
                return null;
            }
        };
    }
    public void addExersize(SingleExersize x){
        allExersizes.add(x);
    }

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public int getWorkoutID() {
        return workoutID;
    }

    public void setWorkoutID(int workoutID) {
        this.workoutID = workoutID;
    }

    public List<SingleExersize> getAllExersizes() {
        return allExersizes;
    }

    public void setAllExersizes(List<SingleExersize> allExersizes) {
        this.allExersizes = allExersizes;
    }

    public void removeExersize(SingleExersize x){
        allExersizes.remove(x);
    }
}
