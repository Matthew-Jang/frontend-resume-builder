<template>
    <div class="profile-step-container">
      <!-- Top Navigation Tabs -->
      <nav class="tabs">
        <ul>
          <li>Templates</li>
          <li>Profile</li>
          <li>Experience</li>
          <li>Skills</li>
          <li>Education</li>
          <li>Contact</li>
          <li>References</li>
          <li>Confirm</li>
        </ul>
      </nav>
  
      <!-- Step Heading -->
      <div class="step-header">
        <h2>STEP 2</h2>
        <h1>Provide a brief, professional summary of your background and expertise</h1>
      </div>
  
      <!-- Profile Input Field -->
      <div class="profile-input">
        <label for="profile-summary">Your Profile</label>
        <textarea
          id="profile-summary"
          placeholder="Enter your information here"
          v-model="profileSummary"
          required
        ></textarea>
      </div>
  
      <!-- Continue Button -->
      <button class="continue-button">Continue →</button>
  
      <!-- Progress Bar -->
      <div class="progress-bar">
        <div class="progress" style="width: 25%;"></div>
        <span class="progress-percentage">25%</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        profileSummary: "",
      };
    },
  };
  </script>
  
  <style scoped>
/* Styles for the navigation tabs */
.tabs {
  display: flex;
  justify-content: center;
  padding: 1rem 0;
  font-weight: bold;
  font-size: 1rem;
  color: #c49aff;
  gap: 20px;
}

.tabs ul {
  list-style: none;
  display: flex;
  gap: 1.5rem;
}

.tabs li {
  cursor: pointer;
}

/* Step Header */
.step-header {
  text-align: center;
  margin: 2rem auto;
  max-width: 600px;
}

.step-header h2 {
  font-size: 1rem;
  color: #d6b3ff;
  margin: 0;
}

.step-header h1 {
  font-size: 1.8rem;
  color: #9d6cff;
  font-weight: bold;
}

/* Profile Input Field */
.profile-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem auto;
  width: 80%;
  max-width: 600px;
}

.profile-input label {
  font-size: 1.2rem;
  color: #9d6cff;
  margin-bottom: 0.5rem;
}

.profile-input textarea {
  width: 100%;
  height: 150px;
  padding: 1rem;
  border: 1px solid #f3e8ff;
  background-color: #f8f0ff;
  border-radius: 5px;
  font-size: 1rem;
  color: #9d6cff;
  resize: none;
  box-shadow: 0px 4px 12px rgba(157, 108, 255, 0.15);
}

/* Continue Button */
.continue-button {
  background-color: #9d6cff;
  color: #fff;
  padding: 0.8rem 2rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  margin-top: 2rem;
  transition: background-color 0.3s;
}

.continue-button:hover {
  background-color: #7b4fcf;
}

/* Progress Bar */
.progress-bar {
  width: 80%;
  max-width: 600px;
  margin: 1.5rem auto;
  height: 10px;
  background-color: #f3e8ff;
  border-radius: 5px;
  position: relative;
}

.progress {
  height: 100%;
  background-color: #9d6cff;
  border-radius: 5px;
}

.progress-percentage {
  text-align: center;
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #9d6cff;
}
</style>

  