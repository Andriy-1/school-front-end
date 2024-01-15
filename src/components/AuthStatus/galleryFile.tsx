import React from 'react'
import withFileComponent from '../../hoc/file';

const GalleryFile: React.FC = ({ error, onSubmit, handleClickDel, handleSubmit, handleFileUpload, errorMessage, inputRef, dataFormItems }: any) => {
	return <div className="document__form-block">
		<span className="f-center error">
			{error || errorMessage}
		</span>
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="document-form"
			encType="multipart/form-data">
			<div className="document-form__row-block">
				<div>
					<input
						ref={inputRef}
						type="file"
						accept='.png,.jpg,.jpeg,.webp'
						className="document-form__file input-file"
						name="file"
						onChange={handleFileUpload}
						multiple
					/>
					<span
						onClick={() => inputRef.current.click()}
						className="btn document-form__btn-file input-file-btn">
						Вибрать файл
					</span>
				</div>
				<button type="submit" className="btn document-form__btn">
					Додати
				</button>
			</div>
		</form>
		<div className="gallery__container-photo">
			<>
				{
					dataFormItems &&
					dataFormItems.map((item: any) => (
						<div key={item.id} className="gallery__block-photo ">
							<span onClick={() => handleClickDel(item.id)} className="btn-del-img btn">
								Видалити фото
							</span>
							<img
								className=" gallery__photo gallery__photo-form"
								src={item.data}
								alt="photo_prevew"
							/>
						</div>

					))}
			</>
		</div>
	</div>

}
const GallerywithFileComponent = withFileComponent(GalleryFile);
export default GallerywithFileComponent;