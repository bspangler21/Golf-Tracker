import { useFetchHoles } from "../hooks/HoleHooks";
import { mockHoles } from "../mockData/mockHoles";
import { Hole } from "../types/Hole";

export function getHolesByCourseId(id: string): Hole[] {
	const { data } = useFetchHoles();
	let holes: Hole[] = data ?? mockHoles;
	let courseHoles: Hole[] = holes.filter((hole) => hole.courseId === id);
	return courseHoles;
}

export function getHardestHoles(
	courseId: string,
	handicapDifference: number
): Hole[] {
	let holes: Hole[] = getHolesByCourseId(courseId);
	let hardestHoles: Hole[] = [];
	let holesSortedByHandicap: Hole[] = holes.sort((a, b) =>
		b.holeHandicap !== undefined && a.holeHandicap !== undefined
			? a.holeHandicap - b.holeHandicap
			: 0
	);
	let holesToUse: Hole[] = holesSortedByHandicap.slice(0, handicapDifference);
	hardestHoles = hardestHoles.concat(holesToUse);
	return hardestHoles;
}
