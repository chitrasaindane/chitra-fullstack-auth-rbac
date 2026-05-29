package com.rbac.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class ContentController {
    
    @GetMapping("/api/public/content")
    public ResponseEntity<Map<String, String>> getPublicContent() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "This is PUBLIC content");
        response.put("description", "Anyone can access this");
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/api/user/content")
    public ResponseEntity<Map<String, Object>> getUserContent(@AuthenticationPrincipal UserDetails userDetails) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "This is USER content");
        response.put("description", "USER and ADMIN can access this");
        response.put("user", userDetails.getUsername());
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/api/admin/content")
    public ResponseEntity<Map<String, Object>> getAdminContent(@AuthenticationPrincipal UserDetails userDetails) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "This is ADMIN content");
        response.put("description", "Only ADMIN can access this");
        response.put("user", userDetails.getUsername());
        return ResponseEntity.ok(response);
    }
}
