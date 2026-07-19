package com.jobtracker.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.Map;
import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class ApplicationControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private String tokenA;
    private String tokenB;
    private Long userAApplicationId;

    @BeforeEach
    void setup() throws Exception {
        String emailA = "userA-" + UUID.randomUUID() + "@example.com";
        String emailB = "userB-" + UUID.randomUUID() + "@example.com";

        registerUser("userA", emailA, "Password123!");
        registerUser("userB", emailB, "Password123!");

        tokenA = login(emailA, "Password123!");
        tokenB = login(emailB, "Password123!");

        userAApplicationId = createApplication(tokenA, "Acme", "Backend Developer");
    }

    @Test
    void userACanGetTheirOwnApplication() throws Exception {
        mockMvc.perform(get("/api/applications/{id}", userAApplicationId)
                        .header("Authorization", "Bearer " + tokenA))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(userAApplicationId))
                .andExpect(jsonPath("$.company").value("Acme"));
    }

    @Test
    void userBCannotGetUserAsApplication() throws Exception {
        mockMvc.perform(get("/api/applications/{id}", userAApplicationId)
                        .header("Authorization", "Bearer " + tokenB))
                .andExpect(status().isNotFound());
    }

    @Test
    void userBCannotUpdateUserAsApplication() throws Exception {
        mockMvc.perform(put("/api/applications/{id}", userAApplicationId)
                        .header("Authorization", "Bearer " + tokenB)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"company\":\"HACKED\",\"role\":\"x\",\"status\":\"APPLIED\"}"))
                .andExpect(status().isNotFound());
    }

    @Test
    void userBCannotDeleteUserAsApplication() throws Exception {
        mockMvc.perform(delete("/api/applications/{id}", userAApplicationId)
                        .header("Authorization", "Bearer " + tokenB))
                .andExpect(status().isNotFound());
    }

    @Test
    void unauthenticatedRequestIsRejected() throws Exception {
        mockMvc.perform(get("/api/applications/{id}", userAApplicationId))
                .andExpect(status().isForbidden());
    }

    @Test
    void gettingNonExistentIdReturns404() throws Exception {
        mockMvc.perform(get("/api/applications/{id}", 999999L)
                        .header("Authorization", "Bearer " + tokenA))
                .andExpect(status().isNotFound());
    }

    private void registerUser(String username, String email, String password) throws Exception {
        mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of(
                                "username", username,
                                "email", email,
                                "password", password
                        ))))
                .andExpect(status().isOk());
    }

    private String login(String email, String password) throws Exception {
        MvcResult result = mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of(
                                "email", email,
                                "password", password
                        ))))
                .andExpect(status().isOk())
                .andReturn();

        JsonNode body = objectMapper.readTree(result.getResponse().getContentAsString());
        return body.get("token").asText();
    }

    private Long createApplication(String token, String company, String role) throws Exception {
        MvcResult result = mockMvc.perform(post("/api/applications")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of(
                                "company", company,
                                "role", role,
                                "status", "APPLIED"
                        ))))
                .andExpect(status().isCreated())
                .andReturn();

        JsonNode body = objectMapper.readTree(result.getResponse().getContentAsString());
        return body.get("id").asLong();
    }
}
