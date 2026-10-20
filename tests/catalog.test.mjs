import assert from "node:assert/strict";
import test from "node:test";
import {
  beamHubLinks,
  courses,
  ecosystem,
  filterCourses,
  getCourse,
  learnerPaths,
  learningCategories,
  moreSpaces,
  podcastSpotlight,
} from "../lib/beamhub.ts";

test("the featured catalogue has three unique, sourced learning spaces", () => {
  assert.equal(courses.length, 3);
  assert.deepEqual(courses.map((course) => course.id), ["shielding", "linac", "gamper"]);
  assert.equal(new Set(courses.map((course) => course.id)).size, 3);
  for (const course of courses) {
    assert.equal(new URL(course.source).hostname, "www.beamhub.org");
    assert.ok(course.officialTitle);
    assert.ok(course.description);
    assert.equal(course.focus.length, 4);
    assert.equal(course.facts.length, 3);
  }
});

test("an empty or whitespace-only query returns the selected category", () => {
  assert.equal(filterCourses("all", "").length, 3);
  assert.equal(filterCourses("all", "   ").length, 3);
  assert.deepEqual(
    filterCourses("protection", " ").map((course) => course.id),
    ["shielding"],
  );
});

test("category counts match the real featured catalogue", () => {
  const expected = { all: 3, protection: 1, engineering: 1, radiotherapy: 1 };
  for (const category of learningCategories) {
    assert.equal(filterCourses(category.id, "").length, expected[category.id]);
  }
});

test("search is case-insensitive and excludes temporarily hidden courses", () => {
  assert.deepEqual(filterCourses("all", "  sBrT  ").map((course) => course.id), ["gamper"]);
  assert.deepEqual(
    filterCourses("all", "certificate").map((course) => course.id),
    ["shielding"],
  );
  assert.deepEqual(filterCourses("all", "Eclipse"), []);
  assert.deepEqual(filterCourses("all", "Radiology Anatomy"), []);
  assert.deepEqual(filterCourses("all", "Radiation Physics: A First Look"), []);
});

test("search combines words and respects the selected category", () => {
  assert.deepEqual(filterCourses("all", "linac safety").map((course) => course.id), ["shielding", "linac"]);
  assert.deepEqual(filterCourses("engineering", "linac safety").map((course) => course.id), ["linac"]);
  assert.equal(filterCourses("radiotherapy", "shielding").length, 0);
  assert.equal(filterCourses("all", "not-a-real-course").length, 0);
});

test("role suggestions always resolve to real, unique courses", () => {
  assert.equal(learnerPaths.length, 4);
  for (const path of learnerPaths) {
    assert.equal(new Set(path.courseIds).size, path.courseIds.length);
    for (const id of path.courseIds) {
      assert.equal(getCourse(id).id, id);
    }
  }
});

test("published curriculum facts remain accurate", () => {
  assert.ok(getCourse("linac").facts.includes("20 lessons"));
  assert.ok(getCourse("shielding").facts.includes("Over 3 hours of recorded content"));
  assert.ok(getCourse("shielding").facts.includes("Completion certificate on request"));
  assert.equal(getCourse("gamper").metric, "SBRT & SRS");
});

test("all ten ecosystem destinations point to BeamHub, not placeholder actions", () => {
  const destinations = [...ecosystem, ...moreSpaces, podcastSpotlight];
  assert.equal(destinations.length, 10);
  assert.equal(new Set(destinations.map((space) => space.href)).size, 10);
  for (const space of destinations) {
    assert.equal(new URL(space.href).hostname, "www.beamhub.org");
    assert.ok(new URL(space.href).pathname.length > 1);
  }
  assert.equal(beamHubLinks.email, "mailto:admin@beamhub.org");
});
