# Specification

## Summary
**Goal:** Add an explicit "Calculate" action so the final CGPA/GGPA result is only shown after the user clicks a prominent button, and is hidden again whenever inputs change.

**Planned changes:**
- Add a prominent "Calculate" button on the main GGPA calculator page near the results area.
- Gate the final CGPA/GGPA display behind a new explicit "calculated" state so it only appears after clicking "Calculate".
- Reset/hide the previously shown final result when the user edits credits/grades, adds/removes subjects, or adds/removes semesters; require clicking "Calculate" again to display an updated final result.
- Keep existing validation/error messaging: on "Calculate" with incomplete/invalid inputs, show the existing errors in the results area instead of a numeric value.
- Update the final result label to English text referencing CGPA (e.g., "Your CGPA") while keeping the existing GGPA calculation logic unchanged.

**User-visible outcome:** Users fill in semesters/subjects and click "Calculate" to reveal the final CGPA/GGPA; if they change any inputs afterward, the final result is hidden until they click "Calculate" again, and the result area shows CGPA-labeled text in English.
