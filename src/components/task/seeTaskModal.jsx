
import './task.css';

function SeeTaskModal({setShowModal, task}) {

    console.log(task);

    const handleClose = () => {
        setShowModal(false);
      };

  return (
    <>
     <div id="overlay-modal-category" draggable="false" onClick={handleClose}></div>
    <section className="modal" id="modal_dblClick" draggable="false" onClick={handleClose}>
         <div>
            <div className="modal_exit" id="modal_cancel">&times;</div>
            <div className="label_modal">Title</div>
            <div id="modal_title">{task.title}</div>
         </div>
         <div>
            <div className="label_modal">Category</div>
            <div id="modal_category">{task.category.title}</div>
        </div>
         <div>
            <div className="label_modal" id="label_description">Description</div>
            <div id="modal_description">{task.description}</div>
         </div>
         <div id="modal_dates">
            <span className="label_modal">Initial Date</span>
            <span className="span_date" id="modal_startDate">   {task.initialDate}</span>
            <span className="label_modal" id="endDate_label">End Date</span>
            <span className="span_date" id="modal_endDate">    {task.endDate}</span>
         </div>
         <div id="modal_dates">
            <span className="label_modal">Author</span>
            <span className="span_author" id="modal_author">   {task.author.username}</span>
         </div>
      </section>
    </>
  );
}

export default SeeTaskModal;