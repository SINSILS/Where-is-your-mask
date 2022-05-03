import cv2
import numpy as np
import mediapipe as mp
from dataclasses import dataclass


@dataclass
class CoordinateIndex:
    x: int
    y: int
    index: int


@dataclass
class MaskImage:
    img: None
    img_gray: None
    height: int
    width: int
    points: list[CoordinateIndex]
    face_point_index_mask_area: list[int]


__FACE_MESH = mp.solutions.face_mesh.FaceMesh()
__DEFAULT_MASK_POINTS = [
    CoordinateIndex(120, 345, 234),
    CoordinateIndex(160, 345, 227), #
    CoordinateIndex(218, 368, 117), #
    CoordinateIndex(275, 385, 197),
    CoordinateIndex(329, 368, 346), #
    CoordinateIndex(383, 345, 447), #
    CoordinateIndex(423, 345, 454),
    CoordinateIndex(423, 295, 361),
    CoordinateIndex(423, 245, 397),
    CoordinateIndex(365, 207, 379),
    CoordinateIndex(305, 173, 400),
    CoordinateIndex(275, 165, 152),
    CoordinateIndex(245, 173, 176),
    CoordinateIndex(183, 205, 150),
    CoordinateIndex(120, 255, 172),
    CoordinateIndex(120, 300, 132),

]


def __raw_image_to_cv2(raw_image: bytes):
    return cv2.imdecode(np.frombuffer(raw_image, dtype=np.uint8), flags=1)


def __try_create_review_image(raw_face_image: bytes, mask: MaskImage, indexes_triangles,):
    # # Visualize the points
    for i in range(0, np.size(__DEFAULT_MASK_POINTS)):
        x = __DEFAULT_MASK_POINTS[i].x
        y = __DEFAULT_MASK_POINTS[i].y
        cv2.circle(mask.img, (x, 548- y), 2, (255, 0, 0), -1)

    # return cv2.imencode('.png', mask.img)[1]

    image = __raw_image_to_cv2(raw_face_image)
    height, width, _ = image.shape
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    image_new_face = np.zeros_like(image)

    # Facial landmarks
    result = __FACE_MESH.process(image_rgb)

    landmarks_points = []
    for facial_landmarks in result.multi_face_landmarks:
        for i in mask.face_point_index_mask_area:
            point1 = facial_landmarks.landmark[i]
            x = int(point1.x * width)
            y = int(point1.y * height)
            landmarks_points.append((x, y))

            # cv2.circle(image, (x, y), 2, (100, 100, 0), -1)
            # cv2.putText(image, str(i), (x, y), 0, 1, (0, 255, 0))
    points = np.array(landmarks_points, np.int32)
    convexhull = cv2.convexHull(points)
    cv2.polylines(image, [convexhull], True, (255, 0, 0), 1)

    # Create mask
    points_mask = []
    for point in mask.points:
        x = point.x
        y = point.y
        points_mask.append((x, y))

    points_mask = np.array(points_mask, np.int32)
    convexhull_mask = cv2.convexHull(points_mask)
    # cv2.polylines(mask_img, [convexhull_mask], True, (255, 0, 0), 1)
    cv2.fillConvexPoly(np.zeros_like(mask.img_gray), convexhull_mask, 255)

    if len(indexes_triangles) == 0:
        # Delaunay triangulation
        rect = cv2.boundingRect(convexhull)
        subdiv = cv2.Subdiv2D(rect)
        subdiv.insert(landmarks_points)
        triangles = subdiv.getTriangleList()
        triangles = np.array(triangles, dtype=np.int32)

        for tr_index in triangles:
            pt1 = (tr_index[0], tr_index[1])
            pt2 = (tr_index[2], tr_index[3])
            pt3 = (tr_index[4], tr_index[5])

            index_pt1 = np.where((points == pt1).all(axis=1))[0][0]

            index_pt2 = np.where((points == pt2).all(axis=1))[0][0]

            index_pt3 = np.where((points == pt3).all(axis=1))[0][0]

            if index_pt1 is not None and index_pt2 is not None and index_pt3 is not None:
                triangle = [index_pt1, index_pt2, index_pt3]
                indexes_triangles.append(triangle)

        # print(indexes_triangles)

    # Triangulation of mask and face
    for tr_index in indexes_triangles:
        # Triangulation of mask
        tr1_pt1 = (mask.points[tr_index[0]].x, mask.points[tr_index[0]].y)
        tr1_pt2 = (mask.points[tr_index[1]].x, mask.points[tr_index[1]].y)
        tr1_pt3 = (mask.points[tr_index[2]].x, mask.points[tr_index[2]].y)
        triangle1 = np.array([tr1_pt1, tr1_pt2, tr1_pt3], np.int32)

        rect1 = cv2.boundingRect(triangle1)
        (x, y, w, h) = rect1
        cropped_triangle1 = mask.img[y: y + h, x: x + w]
        cropped_tr1_mask = np.zeros((h, w), np.uint8)

        points1 = np.array([[tr1_pt1[0] - x, tr1_pt1[1] - y],
            [tr1_pt2[0] - x, tr1_pt2[1] - y],
            [tr1_pt3[0] - x, tr1_pt3[1] - y]], np.int32)

        cv2.fillConvexPoly(cropped_tr1_mask, points1, 255)

        # cv2.line(mask_img, tr1_pt1, tr1_pt2, (0, 0, 255), 1)
        # cv2.line(mask_img, tr1_pt2, tr1_pt3, (0, 0, 255), 1)
        # cv2.line(mask_img, tr1_pt3, tr1_pt1, (0, 0, 255), 1)

        # Triangulation of face
        tr2_pt1 = landmarks_points[tr_index[0]]
        tr2_pt2 = landmarks_points[tr_index[1]]
        tr2_pt3 = landmarks_points[tr_index[2]]
        triangle2 = np.array([tr2_pt1, tr2_pt2, tr2_pt3], np.int32)

        rect2 = cv2.boundingRect(triangle2)
        (x, y, w, h) = rect2

        cropped_tr2_mask = np.zeros((h, w), np.uint8)

        points2 = np.array([[tr2_pt1[0] - x, tr2_pt1[1] - y],
            [tr2_pt2[0] - x, tr2_pt2[1] - y],
            [tr2_pt3[0] - x, tr2_pt3[1] - y]], np.int32)

        cv2.fillConvexPoly(cropped_tr2_mask, points2, 255)

        # cv2.line(image, tr2_pt1, tr2_pt2, (0, 0, 255), 1)
        # cv2.line(image, tr2_pt2, tr2_pt3, (0, 0, 255), 1)
        # cv2.line(image, tr2_pt3, tr2_pt1, (0, 0, 255), 1)

        # Warp triangles
        points1_w = np.float32(points1)
        points2_w = np.float32(points2)
        M = cv2.getAffineTransform(points1_w, points2_w)
        warped_triangle = cv2.warpAffine(cropped_triangle1, M, (w, h))
        warped_triangle = cv2.bitwise_and(warped_triangle, warped_triangle, mask=cropped_tr2_mask)

        # Reconstruct mask
        image_new_face_rect_area = image_new_face[y: y + h, x: x + w]
        image_new_face_rect_area_gray = cv2.cvtColor(image_new_face_rect_area, cv2.COLOR_BGR2GRAY)
        _, mask_triangles_designed = cv2.threshold(image_new_face_rect_area_gray, 1, 255, cv2.THRESH_BINARY_INV)
        warped_triangle = cv2.bitwise_and(warped_triangle, warped_triangle, mask=mask_triangles_designed)

        image_new_face_rect_area = cv2.add(image_new_face_rect_area, warped_triangle)
        image_new_face[y: y + h, x: x + w] = image_new_face_rect_area

    # Mask added (putting mask on face)
    image_face_mask = np.zeros_like(image_gray)
    image_head_mask = cv2.fillConvexPoly(image_face_mask, convexhull, 255)
    image_face_mask = cv2.bitwise_not(image_head_mask)

    image_head_noface = cv2.bitwise_and(image, image, mask=image_face_mask)
    result = cv2.add(image_head_noface, image_new_face)

    # (x, y, w, h) = cv2.boundingRect(convexhull)
    # center_face2 = (int((x + x + w) / 2), int((y + y + h) / 2))

    # seamlessclone = cv2.seamlessClone(result, image, image_head_mask, center_face2, cv2.MIXED_CLONE)

    return cv2.imencode('.png', result)[1]


def preprocess_mask_image(raw_mask_image: bytes):
    mask_img = cv2.resize(__raw_image_to_cv2(raw_mask_image), (548, 548))
    mask_img_gray = cv2.cvtColor(mask_img, cv2.COLOR_BGR2GRAY)
    mask_height, mask_width, _ = mask_img.shape
    print(mask_height, mask_width)
    mask_points = [
        CoordinateIndex(x=p.x, y=mask_height - p.y, index=p.index)
        for p in __DEFAULT_MASK_POINTS
    ]

    return MaskImage(
        img=mask_img,
        img_gray=mask_img_gray,
        height=mask_height,
        width=mask_width,
        points=mask_points,
        face_point_index_mask_area=[p.index for p in mask_points]
    )


def create_review_image(raw_face_image: bytes, mask: MaskImage, indexes_triangles,):
    try:
        return __try_create_review_image(raw_face_image, mask, indexes_triangles,)
    except Exception:
        return raw_face_image
