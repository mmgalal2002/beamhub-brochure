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

test("the featured catalogue has six unique, sourced learning spaces", () => {
  assert.equal(courses.length, 6);
  assert.equal(new Set(courses.map((course) => course.id)).size, 6);
  for (const course of courses) {
    assert.equal(new URL(course.source).hostname, "www.beamhub.org");
    assert.ok(course.officialTitle);
    assert.ok(course.description);
    assert.equal(course.focus.length, 4);
    assert.equal(course.facts.length, 3);
  }
});

test("an empty or whitespace-only query returns the selected category", () => {
  assert.equal(filterCourses("all", "").length, 6);
  assert.equal(filterCourses("all", "   ").length, 6);
  assert.deepEqual(
    filterCourses("protection", " ").map((course) => course.id),
    ["shielding", "physics"],
  );
});

test("category counts match the real featured catalogue", () => {
  const expected = { all: 6, protection: 2, engineering: 1, radiotherapy: 2, anatomy: 1 };
  for (const category of learningCategories) {
    assert.equal(filterCourses(category.id, "").length, expected[category.id]);
  }
});

test("search is case-insensitive and matches official titles, focus and facts", () => {
  assert.deepEqual(filterCourses("all", "  sBrT  ").map((course) => course.id), ["gamper"]);
  assert.deepEqual(filterCourses("all", "sample").map((course) => course.id), ["physics"]);
  assert.deepEqual(
    filterCourses("all", "certificate").map((course) => course.id),
    ["shielding"],
  );
  assert.deepEqual(filterCourses("all", "MRI").map((course) => course.id), ["anatomy"]);
});

test("search combines words and respects the selected category", () => {
  assert.deepEqual(filterCourses("all", "linac safety").map((course) => course.id), ["shielding", "linac"]);
  assert.deepEqual(filterCourses("engineering", "linac safety").map((course) => course.id), ["linac"]);
  assert.equal(filterCourses("anatomy", "shielding").length, 0);
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
  assert.ok(getCourse("eclipse").facts.includes("48 lessons"));
  assert.ok(getCourse("anatomy").facts.includes("34 lessons"));
  assert.ok(getCourse("physics").facts.includes("10 lessons"));
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
