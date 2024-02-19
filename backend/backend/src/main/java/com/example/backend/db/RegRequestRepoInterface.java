package com.example.backend.db;

import com.example.backend.models.RegRequest;

public interface RegRequestRepoInterface {
    
    public int addRequest(RegRequest t);

    public RegRequest getRequest(String username);

    public int updateAge(RegRequest t);

    public int approve(String username);

    public int deny(String username);

    public int[] getAgeCount();
}
