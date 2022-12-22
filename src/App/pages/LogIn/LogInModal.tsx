import { Modal } from '~components/Modal';

interface LogInModal {
  onClose: () => void;
  message: string;
  title: string;
}

export function LogInModal({ onClose, title, message }: LogInModal) {
	return (
		<Modal onClose={onClose}>
			<>
				<h3 className="h3">
					{title}
				</h3>
				<p className="p1">
					{message}
				</p>
			</>
		</Modal>
	);
}

// <Modal className="main-card-modal" onClose={onClose}>

//   //   <div className="main-card-modal__video">
//   //     <iframe
//   //       width="560"
//   //       height="315"
//   //       src={`https://www.youtube.com/embed/${videoId}`}
//   //       title="YouTube video player"
//   //       frameBorder="0"
//   //       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//   //       allowFullScreen
//   //     ></iframe>
//   //   </div>
//   //   <div className="main-card-modal__info">
//   //     <h3 className="h3 inverted main-card-modal__title">{title}</h3>
//   //     <p className="p1 inverted main-card-modal__title">{channelTitle}</p>
//   //     <p className="p1 inverted main-card-modal__title">{description}</p>
//   //     <p className="p1 inverted main-card-modal__title">{publishTime}</p>
//   //   </div>

// </Modal>
