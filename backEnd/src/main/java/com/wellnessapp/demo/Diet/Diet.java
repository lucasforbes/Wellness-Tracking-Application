package com.wellnessapp.demo.Diet;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

public class Diet {
    int userID;
    List<SingleDiet> allDiets;
    public Diet(int creatorId){
        this.userID = creatorId;
        allDiets = new List<SingleDiet>() {
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
            public Iterator<SingleDiet> iterator() {
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
            public boolean add(SingleDiet singleDiet) {
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
            public boolean addAll(Collection<? extends SingleDiet> c) {
                return false;
            }

            @Override
            public boolean addAll(int index, Collection<? extends SingleDiet> c) {
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
            public SingleDiet get(int index) {
                return null;
            }

            @Override
            public SingleDiet set(int index, SingleDiet element) {
                return null;
            }

            @Override
            public void add(int index, SingleDiet element) {

            }

            @Override
            public SingleDiet remove(int index) {
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
            public ListIterator<SingleDiet> listIterator() {
                return null;
            }

            @Override
            public ListIterator<SingleDiet> listIterator(int index) {
                return null;
            }

            @Override
            public List<SingleDiet> subList(int fromIndex, int toIndex) {
                return null;
            }
        };
    }
    public void addDiet(SingleDiet x){
        allDiets.add(x);
    }
    public void removeDiet(SingleDiet x){
        allDiets.remove(x);
    }
}
