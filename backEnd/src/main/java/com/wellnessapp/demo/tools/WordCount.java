package com.wellnessapp.demo.tools;

import java.util.Arrays;

public class WordCount {

    public static Long count(String passage){
        String[] words = passage.split(" ");
        return Arrays.stream(words).count();

    }

}
