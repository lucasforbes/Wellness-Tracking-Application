package com.wellnessapp.demo.Exersize;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

@Getter
@Setter
@ToString

//@RestController
@Document(collection = "Exersize")
public class Exersize {
    @Id
    int id;
    String email;
    String title;
    String description;
    SingleExersize[] activityList;
    Boolean paid;
    String picture;
    String videoLink;
    List<Integer> userIdsToExersizesSubscribed;
//, SingleExersize[] activityList
    public Exersize(String email, String title, String description, Boolean paid) {
        this.email = email;
        this.title = title;
        this.description = description;
        this.paid = paid;
//        this.activityList = activityList;
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
//        this.userIdsToExersizesSubscribed = new List<Integer>() {
//            @Override
//            public int size() {
//                return 0;
//            }
//
//            @Override
//            public boolean isEmpty() {
//                return false;
//            }
//
//            @Override
//            public boolean contains(Object o) {
//                return false;
//            }
//
//            @Override
//            public Iterator<Integer> iterator() {
//                return null;
//            }
//
//            @Override
//            public Object[] toArray() {
//                return new Object[0];
//            }
//
//            @Override
//            public <T> T[] toArray(T[] a) {
//                return null;
//            }
//
//            @Override
//            public boolean add(Integer integer) {
//                return false;
//            }
//
//            @Override
//            public boolean remove(Object o) {
//                return false;
//            }
//
//            @Override
//            public boolean containsAll(Collection<?> c) {
//                return false;
//            }
//
//            @Override
//            public boolean addAll(Collection<? extends Integer> c) {
//                return false;
//            }
//
//            @Override
//            public boolean addAll(int index, Collection<? extends Integer> c) {
//                return false;
//            }
//
//            @Override
//            public boolean removeAll(Collection<?> c) {
//                return false;
//            }
//
//            @Override
//            public boolean retainAll(Collection<?> c) {
//                return false;
//            }
//
//            @Override
//            public void clear() {
//
//            }
//
//            @Override
//            public Integer get(int index) {
//                return null;
//            }
//
//            @Override
//            public Integer set(int index, Integer element) {
//                return null;
//            }
//
//            @Override
//            public void add(int index, Integer element) {
//
//            }
//
//            @Override
//            public Integer remove(int index) {
//                return null;
//            }
//
//            @Override
//            public int indexOf(Object o) {
//                return 0;
//            }
//
//            @Override
//            public int lastIndexOf(Object o) {
//                return 0;
//            }
//
//            @Override
//            public ListIterator<Integer> listIterator() {
//                return null;
//            }
//
//            @Override
//            public ListIterator<Integer> listIterator(int index) {
//                return null;
//            }
//
//            @Override
//            public List<Integer> subList(int fromIndex, int toIndex) {
//                return null;
//            }
//        };
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

//    public List<Integer> getUserIdsToExersizesSubscribed() {
//        return userIdsToExersizesSubscribed;
//    }
//
//    public void setUserIdsToExersizesSubscribed(List<Integer> userIdsToExersizesSubscribed) {
//        this.userIdsToExersizesSubscribed = userIdsToExersizesSubscribed;
//    }

    public void setVideoLink(String videoLink) {
        this.videoLink = videoLink;
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

    public Boolean getPaid() {
        return paid;
    }

    public void setPaid(Boolean paid) {
        this.paid = paid;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public SingleExersize[] getActivityList() {
        return activityList;
    }

    public void setActivityList(SingleExersize[] activityList) {
        this.activityList = activityList;
    }
}
